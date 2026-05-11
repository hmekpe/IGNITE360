import fs from 'fs/promises';
import path from 'path';
import connectDB, { isMongoConfigured } from '@/lib/mongodb';
import Program from '@/lib/models/Program';
import Post from '@/lib/models/Post';
import TeamMember from '@/lib/models/TeamMember';
import Application from '@/lib/models/Application';
import { seedContent } from '@/lib/seed-content';

const DATA_PATH = path.join(process.cwd(), 'data', 'content.json');
const useDatabase = isMongoConfigured();

function sortByNewest(items, field = 'publishedAt') {
  return [...items].sort((a, b) => new Date(b[field] || b.createdAt || 0) - new Date(a[field] || a.createdAt || 0));
}

function slugify(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(seedContent, null, 2), 'utf8');
  }
}

async function readFileStore() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeFileStore(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

function normalizeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

async function tryDatabase(task, fallback) {
  if (!useDatabase) {
    return fallback();
  }

  try {
    await connectDB();
    return await task();
  } catch (error) {
    console.warn('Falling back to local content store because MongoDB is unavailable.', error?.message || error);
    return fallback();
  }
}

export async function getPrograms({ includeInactive = false } = {}) {
  return tryDatabase(async () => {
    const query = includeInactive ? {} : { active: true };
    const records = await Program.find(query).sort({ featured: -1, createdAt: -1 }).lean();
    return records.map((item) => ({ ...item, id: String(item._id) }));
  }, async () => {
    const store = await readFileStore();
    return includeInactive ? store.programs : store.programs.filter((item) => item.active);
  });
}

export async function getProgramBySlug(slug) {
  const programs = await getPrograms({ includeInactive: true });
  return programs.find((item) => item.slug === slug) || null;
}

export async function saveProgram(input) {
  const payload = {
    ...input,
    slug: slugify(input.slug || input.title),
    outcomes: Array.isArray(input.outcomes) ? input.outcomes.filter(Boolean) : [],
    featured: Boolean(input.featured),
    active: input.active !== false,
  };

  return tryDatabase(async () => {
    if (input.id) {
      const updated = await Program.findByIdAndUpdate(input.id, payload, { new: true, runValidators: true }).lean();
      return { ...updated, id: String(updated._id) };
    }

    const created = await Program.create(payload);
    return { ...created.toObject(), id: String(created._id) };
  }, async () => {
    const store = await readFileStore();
    let saved;
    if (input.id) {
      store.programs = store.programs.map((item) => {
        if (item.id === input.id) {
          saved = { ...item, ...payload, id: input.id };
          return saved;
        }
        return item;
      });
    } else {
      saved = { ...payload, id: normalizeId('program') };
      store.programs.unshift(saved);
    }
    await writeFileStore(store);
    return saved;
  });
}

export async function deleteProgram(id) {
  return tryDatabase(async () => {
    await Program.findByIdAndDelete(id);
    return true;
  }, async () => {
    const store = await readFileStore();
    store.programs = store.programs.filter((item) => item.id !== id);
    await writeFileStore(store);
    return true;
  });
}

export async function getPosts({ includeDrafts = false } = {}) {
  return tryDatabase(async () => {
    const query = includeDrafts ? {} : { published: true };
    const records = await Post.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return records.map((item) => ({ ...item, id: String(item._id) }));
  }, async () => {
    const store = await readFileStore();
    const items = includeDrafts ? store.posts : store.posts.filter((item) => item.published);
    return sortByNewest(items);
  });
}

export async function getPostBySlug(slug) {
  const posts = await getPosts({ includeDrafts: true });
  return posts.find((item) => item.slug === slug) || null;
}

export async function savePost(input) {
  const payload = {
    ...input,
    slug: slugify(input.slug || input.title),
    published: Boolean(input.published),
    featured: Boolean(input.featured),
    publishedAt: input.publishedAt || new Date().toISOString(),
  };

  return tryDatabase(async () => {
    if (input.id) {
      const updated = await Post.findByIdAndUpdate(input.id, payload, { new: true, runValidators: true }).lean();
      return { ...updated, id: String(updated._id) };
    }

    const created = await Post.create(payload);
    return { ...created.toObject(), id: String(created._id) };
  }, async () => {
    const store = await readFileStore();
    let saved;
    if (input.id) {
      store.posts = store.posts.map((item) => {
        if (item.id === input.id) {
          saved = { ...item, ...payload, id: input.id };
          return saved;
        }
        return item;
      });
    } else {
      saved = { ...payload, id: normalizeId('post') };
      store.posts.unshift(saved);
    }
    await writeFileStore(store);
    return saved;
  });
}

export async function deletePost(id) {
  return tryDatabase(async () => {
    await Post.findByIdAndDelete(id);
    return true;
  }, async () => {
    const store = await readFileStore();
    store.posts = store.posts.filter((item) => item.id !== id);
    await writeFileStore(store);
    return true;
  });
}

export async function getTeam() {
  return tryDatabase(async () => {
    const records = await TeamMember.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return records.map((item) => ({ ...item, id: String(item._id) }));
  }, async () => {
    const store = await readFileStore();
    return [...store.team].sort((a, b) => (a.order || 0) - (b.order || 0));
  });
}

export async function saveTeamMember(input) {
  const payload = {
    ...input,
    order: Number(input.order || 0),
    socials: input.socials || {},
  };

  return tryDatabase(async () => {
    if (input.id) {
      const updated = await TeamMember.findByIdAndUpdate(input.id, payload, { new: true, runValidators: true }).lean();
      return { ...updated, id: String(updated._id) };
    }

    const created = await TeamMember.create(payload);
    return { ...created.toObject(), id: String(created._id) };
  }, async () => {
    const store = await readFileStore();
    let saved;
    if (input.id) {
      store.team = store.team.map((item) => {
        if (item.id === input.id) {
          saved = { ...item, ...payload, id: input.id };
          return saved;
        }
        return item;
      });
    } else {
      saved = { ...payload, id: normalizeId('team') };
      store.team.push(saved);
    }
    await writeFileStore(store);
    return saved;
  });
}

export async function deleteTeamMember(id) {
  return tryDatabase(async () => {
    await TeamMember.findByIdAndDelete(id);
    return true;
  }, async () => {
    const store = await readFileStore();
    store.team = store.team.filter((item) => item.id !== id);
    await writeFileStore(store);
    return true;
  });
}

export async function getApplications() {
  return tryDatabase(async () => {
    const records = await Application.find({}).sort({ createdAt: -1 }).lean();
    return records.map((item) => ({ ...item, id: String(item._id) }));
  }, async () => {
    const store = await readFileStore();
    return sortByNewest(store.applications, 'createdAt');
  });
}

export async function saveApplication(input) {
  const payload = {
    ...input,
    status: input.status || 'pending',
    createdAt: input.createdAt || new Date().toISOString(),
  };

  return tryDatabase(async () => {
    const created = await Application.create(payload);
    return { ...created.toObject(), id: String(created._id) };
  }, async () => {
    const store = await readFileStore();
    const saved = { ...payload, id: normalizeId('application') };
    store.applications.unshift(saved);
    await writeFileStore(store);
    return saved;
  });
}

export async function updateApplicationStatus(id, status) {
  return tryDatabase(async () => {
    const updated = await Application.findByIdAndUpdate(
      id,
      {
        status,
        reviewedAt: new Date().toISOString(),
      },
      { new: true, runValidators: true }
    ).lean();
    return updated ? { ...updated, id: String(updated._id) } : null;
  }, async () => {
    const store = await readFileStore();
    let updated = null;

    store.applications = store.applications.map((item) => {
      if (item.id === id) {
        updated = {
          ...item,
          status,
          reviewedAt: new Date().toISOString(),
        };
        return updated;
      }

      return item;
    });

    await writeFileStore(store);
    return updated;
  });
}

export async function getDashboardSummary() {
  const [posts, programs, team, applications] = await Promise.all([
    getPosts({ includeDrafts: true }),
    getPrograms({ includeInactive: true }),
    getTeam(),
    getApplications(),
  ]);

  return {
    posts: posts.length,
    programs: programs.length,
    team: team.length,
    applications: applications.length,
    recentApplications: applications.slice(0, 5),
  };
}

export async function getGalleryItems() {
  const posts = await getPosts({ includeDrafts: false });
  return posts
    .filter((post) => post.image || post.videoUrl)
    .map((post) => ({
      id: post.id,
      title: post.title,
      category: post.category,
      image: post.image,
      videoUrl: post.videoUrl,
      date: post.publishedAt,
    }));
}

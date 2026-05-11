'use client';

import Modal from '../ui/Modal';
import SmartImage from '@/components/ui/SmartImage';

export default function TeamModal({ member, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={member?.name}>
      {member && (
        <div>
          {member.image && (
            <SmartImage
              image={member.image}
              alt={member.name}
              wrapperClassName="rounded-lg mb-4 overflow-hidden"
              className="h-full w-full"
              aspectRatio="4 / 3"
            />
          )}
          <p className="text-secondary font-semibold mb-2">{member.role}</p>
          <p className="text-gray-600">{member.bio}</p>
        </div>
      )}
    </Modal>
  );
}

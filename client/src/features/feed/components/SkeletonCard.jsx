import React from 'react';
import Skeleton from '../../../components/ui/Skeleton';

const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width={48} height={48} />
      <div className="space-y-2">
        <Skeleton width={140} height={16} />
        <Skeleton width={100} height={12} />
      </div>
    </div>
    <div className="space-y-2 py-2">
      <Skeleton width="100%" height={24} />
      <Skeleton width="90%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
    <Skeleton width="100%" height={200} className="rounded-xl" />
  </div>
);

export default SkeletonCard;
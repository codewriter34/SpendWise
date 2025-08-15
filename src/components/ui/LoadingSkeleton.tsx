import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SummaryCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton height={16} width={100} className="mb-2" />
              <Skeleton height={32} width={120} />
            </div>
            <Skeleton height={48} width={48} circle />
          </div>
        </div>
      ))}
    </div>
  );
};

export const TransactionListSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Skeleton height={32} width={200} className="mb-6" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4 flex-1">
              <Skeleton height={40} width={40} circle />
              <div className="flex-1">
                <Skeleton height={16} width={150} className="mb-1" />
                <Skeleton height={14} width={100} />
              </div>
            </div>
            <div className="text-right">
              <Skeleton height={16} width={80} className="mb-1" />
              <Skeleton height={14} width={60} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TransactionFormSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Skeleton height={32} width={200} className="mb-6" />
      <div className="space-y-4">
        <Skeleton height={48} />
        <Skeleton height={48} />
        <Skeleton height={48} />
        <Skeleton height={48} />
        <Skeleton height={48} />
        <Skeleton height={56} />
      </div>
    </div>
  );
};

export const RecentTransactionsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Skeleton height={28} width={180} className="mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Skeleton height={32} width={32} circle />
              <div>
                <Skeleton height={14} width={120} className="mb-1" />
                <Skeleton height={12} width={80} />
              </div>
            </div>
            <Skeleton height={16} width={70} />
          </div>
        ))}
      </div>
    </div>
  );
};

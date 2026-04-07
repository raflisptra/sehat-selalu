interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: string;
}

export default function Skeleton({
    className = "",
    width,
    height,
    rounded = "rounded-2xl",
}: SkeletonProps) {
    return (
        <div
            className={`animate-skeleton ${rounded} ${className}`}
            style={{
                width: width || "100%",
                height: height || "1rem",
                background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
                backgroundSize: "200% 100%",
                animation: "skeleton-shimmer 1.5s ease-in-out infinite",
            }}
        />
    );
}


export function SkeletonCard({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white rounded-2xl p-6 space-y-4 ${className}`}>
            <div className="flex items-start justify-between">
                <Skeleton width="3rem" height="3rem" rounded="rounded-xl" />
                <Skeleton width="5rem" height="1.5rem" rounded="rounded-full" />
            </div>
            <Skeleton height="1.25rem" width="60%" />
            <Skeleton height="0.875rem" />
            <Skeleton height="0.875rem" width="80%" />
            <Skeleton height="1rem" width="40%" />
        </div>
    );
}

export function SkeletonHero() {
    return (
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100 p-8 sm:p-12 flex flex-col sm:flex-row items-end" style={{ minHeight: "340px" }}>
            <div className="flex-1 space-y-4">
                <Skeleton width="6rem" height="1.5rem" rounded="rounded-full" />
                <Skeleton width="70%" height="2.5rem" />
                <Skeleton width="50%" height="2.5rem" />
                <Skeleton width="90%" height="1rem" />
                <Skeleton width="75%" height="1rem" />
                <Skeleton width="10rem" height="3rem" rounded="rounded-full" />
            </div>
            <div className="flex-shrink-0 hidden sm:block">
                <Skeleton width="240px" height="280px" rounded="rounded-2xl" />
            </div>
        </div>
    );
}

export function SkeletonTestimonial() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-7 space-y-4">
            <div className="flex items-start gap-4">
                <Skeleton width="3rem" height="3rem" rounded="rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton width="40%" height="1rem" />
                    <Skeleton width="30%" height="0.75rem" />
                    <Skeleton width="5rem" height="0.75rem" />
                    <Skeleton height="0.875rem" />
                    <Skeleton height="0.875rem" width="85%" />
                </div>
            </div>
        </div>
    );
}

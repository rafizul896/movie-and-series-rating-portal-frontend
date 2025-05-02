'use client';

export default function RemoveContentPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-white">Remove Content</h1>
      <p className="text-white">
        Select and remove inappropriate or outdated content from the platform.
      </p>

      {/* Placeholder for removable content */}
      <div>
        <p className="text-sm text-white">No content available for removal at the moment.</p>
      </div>
    </div>
  );
}

import FlowerUploadForm from "@/components/FlowerUploadForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminFlowersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose to-cream py-12">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-border-soft bg-white/90 p-6 shadow-soft">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Admin Portal</p>
            <h1 className="mt-2 text-4xl font-bold text-charcoal">Flower Management</h1>
            <p className="mt-2 text-sm text-muted">
              Add or update flowers in your catalogue with image uploads and availability details.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <FlowerUploadForm />
      </div>
    </div>
  );
}

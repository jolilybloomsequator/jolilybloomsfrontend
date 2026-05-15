import FlowerUploadForm from "@/components/FlowerUploadForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminFlowersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Flower Management</h1>
          <AdminLogoutButton />
        </div>

        <FlowerUploadForm />

        <div className="mt-12 max-w-2xl mx-auto bg-white p-6 rounded border">
          <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Add credentials to <code className="bg-gray-200 px-2 py-1">.env.local</code>:
              <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-x-auto">
{`ADMIN_EMAIL=info@jolilybloomsequator.com
ADMIN_PASSWORD=PrincessRhea2023!`}
              </pre>
            </li>
            <li>You are now logged in and can manage flowers</li>
            <li>Fill out the flower form above</li>
            <li>Upload an image (optional) – images are stored in <code className="bg-gray-200 px-2 py-1">public/images/flowers/</code></li>
            <li>Submit – flower data is saved to <code className="bg-gray-200 px-2 py-1">src/data/flowers.json</code> and image to <code className="bg-gray-200 px-2 py-1">public/images/flowers/</code></li>
            <li>Changes appear immediately on the site</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

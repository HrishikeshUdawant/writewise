export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl text-blue-600">WriteWise</h1>
        <div className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
        </div>
      </div>
    </nav>
  );
}

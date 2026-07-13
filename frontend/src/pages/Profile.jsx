function Profile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-500 text-lg">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Your Profile</h1>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full bg-purple-600 text-white flex items-center justify-center text-4xl font-bold">
            {initials}
          </div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Phone</span>
            <span className="font-medium">{user.phone || "Not added"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Address</span>
            <span className="font-medium">{user.address || "Not added"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Role</span>
            <span className="font-medium capitalize">{user.role}</span>
          </div>
        </div>

        <button className="mt-8 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;

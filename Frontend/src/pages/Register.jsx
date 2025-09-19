function Register() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="border border-red-200 shadow-lg shadow-red-300 rounded-2xl h-[65%] w-[25%] flex flex-col ">
        <div className="flex justify-center py-2">
          <h1 className="text-xl font-bold tracking-wider">Register</h1>
        </div>
        <form className="p-5">
          <div className="flex gap-2 justify-center items-center">
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border xl:w-[80%] xl:py-1 p-1.5 outline-0"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

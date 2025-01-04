


export default function Login() {

    



    return (
    <div className="h-full flex justify-center items-center">


        <form className="space-y-6">

        <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="text"
                name="password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>




    </div>
    )
}
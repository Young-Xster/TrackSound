import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

export default function Signup() {
  return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1>Sign up to start listening</h1>
      <form className="w-full max-w-md bg-gray-400 p-8 rounded-lg shadow-md">
        <label className="block mb-4">
          <span className="text-gray-700 mb-2 mt-4">Email</span>
        </label>
        <Input type="email" placeholder="Email" />

        <label className="block mb-2 mt-4">
          <span className="text-gray-700 mb-2 mt-4">Password</span>
        </label>
        <Input type="password" placeholder="Password" />

        <label className="block mb-2 mt-4">
          <span className="text-gray-700 mb-2 mt-4 ">Confirm Password</span>
        </label>
        <Input type="password" placeholder="Confirm Password" />

      </form>
    </div>
  );
}

"use client";
import { handleGenerate } from "@/actions/generateNameAction";
import React, { useActionState } from "react";

const Home = () => {
  const [state, formAction, isPending] = useActionState(handleGenerate, null); // [state, formAction]
  return (
    <div>
      <form action={formAction}>
        <h1>type your text</h1>
        <textarea
          name="text"
          className="border p-2 rounded "
          placeholder="Paste text to generate..."
        ></textarea>

        <button
          type="submit"
          disabled={isPending}
          className="bg-purple-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {isPending ? "Generating names..." : "generate name"}
        </button>
      </form>

      {/* This is where your 'string' finally shows up! */}
      {state && (
        <div className="mt-6 p-4 bg-gray-50 border-l-4 border-purple-600">
          <h2 className="font-bold text-gray-800">generate name:</h2>
          <p className="text-gray-800">{state}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

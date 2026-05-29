"use client";

import {useState} from "react";

type EmailAuthFormValues = {
  email: string;
  name: string;
  password: string;
};

type EmailAuthFormProps = {
  onSignIn: (values: EmailAuthFormValues) => void;
  onSignUp: (values: EmailAuthFormValues) => void;
};

export default function EmailAuthForm({ onSignIn, onSignUp }: EmailAuthFormProps) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const values = { email, name, password };

  return (
    <div className="space-y-3 rounded-md border border-gray-200 p-4">
      <div className="flex rounded-md bg-gray-100 p-1">
        <button
          onClick={() => setMode("sign-in")}
          className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition ${
            mode === "sign-in"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
          type="button"
        >
          Sign in
        </button>
        <button
          onClick={() => setMode("sign-up")}
          className={`flex-1 rounded px-3 py-1.5 text-sm font-medium transition ${
            mode === "sign-up"
              ? "bg-white text-gray-950 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
          type="button"
        >
          Sign up
        </button>
      </div>

      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500"
        placeholder="email"
        type="email"
      />
      {mode === "sign-up" && (
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500"
          placeholder="name"
          type="text"
        />
      )}
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500"
        placeholder="password"
        type="password"
      />

      <button
        onClick={() => {
          if (mode === "sign-up") {
            onSignUp(values);
            return;
          }

          onSignIn(values);
        }}
        className="w-full rounded-md bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        type="button"
      >
        {mode === "sign-up" ? "Create account" : "Sign in"}
      </button>
    </div>
  );
}

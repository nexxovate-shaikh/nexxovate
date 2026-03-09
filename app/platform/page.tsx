import Link from "next/link";

export default function PlatformHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold">
        Nexxovate AI Agents Platform
      </h1>

      <p className="mt-3 text-gray-600">
        Deploy intelligent AI assistants trained on your organization’s
        knowledge and documents.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          href="/platform/upload"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <h3 className="font-semibold text-lg">
            Upload Knowledge
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Add documents, policies and internal data
            for AI training.
          </p>
        </Link>

        <Link
          href="/platform/agent"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <h3 className="font-semibold text-lg">
            AI Agent
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Ask questions and get instant answers
            from company knowledge.
          </p>
        </Link>

        <Link
          href="/platform/settings"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
        >
          <h3 className="font-semibold text-lg">
            Settings
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            Configure your AI assistant
            and integrations.
          </p>
        </Link>

      </div>

    </div>
  );
}
import React from "react";
import Link from "next/link";

import Hero from "../components/Hero";
import { SiteType } from "../schema/page";
import redis, { REDIS_SITE_KEY } from "../lib/db";

const App: React.FC<{ data: SiteType }> = ({ data }) => (
  <div className="w-full mx-auto">
    <div className="px-4 sm:px-6 py-4 sm:py-6 mb-12 bg-gray-100">
      <div className="flex flex-wrap justify-between">
        <h1 className="basis-4/6 text-2xl font-bold tracking-tight text-gray-900">
          Site
        </h1>
        <Link
          href="/"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Edit this page
        </Link>
      </div>
    </div>
    <div className="px-4 sm:px-6">
      <Hero data={data} />
    </div>
  </div>
);

export async function getStaticProps() {
  const redisDoc = await redis.get(REDIS_SITE_KEY);

  console.log(redisDoc);
  debugger;
  // TODO-1: Site should read this data instead of mocking it
  const data = {
    heading: "Join our team",
    description:
      "Lorem ipsum dolor sit amet. Eos accusamus fuga aut dolorum mollitia eum quia dolores id repudiandae autem. Aut dolore voluptates non unde quod vel alias adipisci ut impedit laudantium hic quos tempora? Ut accusamus voluptatum ut quia debitis est inventore voluptatum quo iusto nesciunt sed sint omnis quo impedit nemo ab voluptas quia. Qui modi labore et odit quis sit odit voluptatem et magnam ullam et impedit laboriosam.",
    primaryButtonText: "Get started",
    secondaryButtonText: "Learn more",
  };

  return {
    props: {
      data,
    },
  };
}

export default App;

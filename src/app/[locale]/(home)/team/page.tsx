import React from "react";
import "./page.scss";
import TeamMemberCard from "./_components/team-card/component";
import { getTeam } from "@/api/services/teamService";
import { cookies } from "next/headers";
const Page = async () => {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "uz";
  // Jamoa a'zolari uchun ma'lumotlar (masalan)
  const teamMembers = (await getTeam(locale)).teams || [];
  console.log(teamMembers);
  return (
    <div className="team sm:px-3 lg:px-5 px-2  py-10">
      {/* Sarlavha */}
      <div className="title">
        <h1 className="lg:text-3xl text-center sm:text-2xl text-xl font-bold font-roboto">
          Our Team
        </h1>
      </div>
      <h2 className="text-center sm:text-xl text-lg font-timepos mt-5 text-gray-600 dark:text-gray-300">
        Meet the team behind our success
      </h2>
      {/* Jamoa a'zolari */}
      <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            image={member.image}
            linkedin={member.linkedin}
            position={member.position}
            description={member.description}
            telegram={member.telegram}
            instagram={member.instagram} 
            github={member.github} />
        ))}
      </div>
    </div>
  );
};

export default Page;
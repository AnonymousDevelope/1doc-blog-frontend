import React from "react";
import "./page.scss";
import TeamMemberCard from "./_components/team-card/component";
// import { useTranslations } from "next-intl";
const Page = () => {
  // Jamoa a'zolari uchun ma'lumotlar (masalan)
  const teamMembers = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      description:
        "John is a passionate developer with 5 years of experience in building user-friendly web applications.",
      avatarUrl: "/avatars/john-doe.jpg",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      telegramUrl: "https://t.me/johndoe",
      instagramUrl: "https://instagram.com/johndoe",
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      description:
        "Jane specializes in creating intuitive and visually appealing designs for web and mobile apps.",
      avatarUrl: "/avatars/jane-smith.jpg",
      linkedinUrl: "https://linkedin.com/in/janesmith",
      telegramUrl: "https://t.me/janesmith",
    },
    {
      name: "Alex Brown",
      role: "Backend Developer",
      description:
        "Alex has extensive experience in building scalable and secure server-side applications.",
      avatarUrl: "/avatars/alex-brown.jpg",
      linkedinUrl: "https://linkedin.com/in/alexbrown",
      instagramUrl: "https://instagram.com/alexbrown",
    },
  ];

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
            role={member.role}
            description={member.description}
            avatarUrl={member.avatarUrl}
            linkedinUrl={member.linkedinUrl}
            telegramUrl={member.telegramUrl}
            instagramUrl={member.instagramUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
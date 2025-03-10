import React from 'react'

interface PageProps {
  params: {
    slug: string;
  };
}

const page = ({params}: PageProps) => {
    const {slug} = params;
  return (
    <div>{slug}</div>
  )
}

export default page
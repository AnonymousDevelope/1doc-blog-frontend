import Link from 'next/link'
import { headers } from 'next/headers'
 
export default async function NotFound() {
    const headersList = await headers()
    const domain = headersList.get('host')
    const data = await getSiteData(domain)
    return (
        <div>
            <h2>Not Found: {data.name}</h2>
            <p>Could not find requested resource</p>
            <p>
                View <Link href="/blog">all posts</Link>
            </p>
        </div>
    )
}

async function getSiteData(domain: string | null) {
    if (!domain) {
        throw new Error('Domain is required to fetch site data.')
    }

    // Simulate fetching site data based on the domain
    const mockData = {
        'example.com': { name: 'Example Blog' },
        'myblog.com': { name: 'My Personal Blog' },
    }

    const siteData = mockData[domain as keyof typeof mockData] || { name: 'Unknown Site' }
    return siteData
}

// Removed duplicate function implementation

import { projects } from "@/assets/asset";

export type Project = {
    title: string,
    subtitle?: string,
    category?: string,
    description: string,
    icon: string,
    image: string[],
    link: string,
    tags: string[]
}

export const Projects : Project[] = [
    {
        title: 'Billing Inc',
        category: 'Finance',
        subtitle: 'Finance, Inventory and Accounting App for small and medium bussiness',
        description: 'An easy to use invoicing, inventory and accounting app, for small and medium bussiness to grow and manage their accounts integrated with various features and cloud services.',
        icon: projects.billinLogo,
        image: [projects.billin1, projects.billin2, projects.billin3, projects.billin4],
        link: 'https://billinginc.now.sh/',
        tags: ['React', 'Typescript', 'GCP']
    },
    
]
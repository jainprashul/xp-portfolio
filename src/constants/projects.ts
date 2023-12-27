import { projects } from "@/assets/asset";

export type Project = {
    title: string,
    subtitle?: string,
    category?: string,
    description: string,
    icon: string,
    image: string[],
    link: string,
    tags: string[],
    duration: string,
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
        tags: ['React', 'Typescript', 'GCP'],
        duration: '8 months',
    },
    {
        title: 'Helping Hands',
        category: 'Social',
        subtitle: 'A social platform to connect people in need with people who can help',
        description: 'A social platform to connect people in need with people who can help. Helping Hands is a platform to help people in need by connecting them with people who can help them. It will be serve a job board for people who are looking for jobs and people who are looking for workers.',
        icon: projects.helpingHandsLogo,
        link: "https://github.com/jainprashul/HelpingHand",
        duration: '4 days (Hackathon)',
        tags: ['Android', 'Typescript', 'React Native', 'Postgres'],
        image: [projects.helpingHands1, projects.helpingHands2, projects.helpingHands3, projects.helpingHands4],
    }
    
]
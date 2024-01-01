import style from './TechStack.module.css'
import { vite } from '@/assets/asset'


const TechStack = () => {

    const languages500 = [
        {
            name: 'TypeScript',
            icon: 'https://img.icons8.com/color/48/000000/typescript.png'
        },
        {
            name: 'JavaScript',
            icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png'
        },
        {
            name: "React",
            icon: "https://img.icons8.com/color/48/000000/react-native.png"
        },
        {
            name: 'Redux',
            icon: 'https://img.icons8.com/color/48/000000/redux.png'
        },
        {
            name: 'Node.js',
            icon: 'https://img.icons8.com/color/48/000000/nodejs.png'
        },
        {
            name: 'HTML',
            icon: 'https://img.icons8.com/color/48/000000/html-5--v1.png'
        },
        {
            name: 'CSS',
            icon: 'https://img.icons8.com/color/48/000000/css3.png'
        },
    ]

    const languages100 = [
        {   
            name : "vite",
            icon : vite
        },
        {
            name : "Expo",
            icon : 'https://img.icons8.com/color/48/000000/expo.png'
        },
        {
            name: 'Flutter',
            icon: 'https://img.icons8.com/color/48/000000/flutter.png'
        },
        {
            name: "Android",
            icon: "https://img.icons8.com/color/48/000000/android-os.png"
        },
        {
            name: 'MongoDB',
            icon: 'https://img.icons8.com/color/48/000000/mongodb.png'
        },
        {
            name: 'Firebase',
            icon: 'https://img.icons8.com/color/48/000000/firebase.png'
        },
        {
            name: 'Python',
            icon: 'https://img.icons8.com/color/48/000000/python--v1.png'
        },
        {
            name: 'Go',
            icon: 'https://img.icons8.com/color/48/000000/golang.png'
        },
        {
            name: 'C#',
            icon: 'https://img.icons8.com/color/48/000000/c-sharp-logo.png'
        },
    ]

    const tools = [
        {
            name: 'VS Code',
            icon: 'https://img.icons8.com/color/48/000000/visual-studio-code-2019.png'
        },
        {
            name: 'Figma',
            icon: 'https://img.icons8.com/color/48/000000/figma--v1.png'
        },
        {
            name: 'Github',
            icon: 'https://img.icons8.com/color/48/000000/github.png'
        },
        {
            name: 'Git',
            icon: 'https://img.icons8.com/color/48/000000/git.png'
        },
        {
            name: 'Docker',
            icon: 'https://img.icons8.com/color/48/000000/docker.png'
        },
        {
            name: 'Android Studio',
            icon: 'https://img.icons8.com/color/48/000000/android-studio--v2.png'
        },
        {
            name: 'Google Cloud',
            icon: 'https://img.icons8.com/color/48/000000/google-cloud-platform.png'
        },

    ]

    return (
        <div>
            <h5 className={style.heading}>Languages and Frameworks</h5>
            <p className={style.text}>
                <span>2023</span> was a year of change in tech stack. AI and ML were the buzzwords of the year.
                I started learning about AI and ML and how they can be used to solve real world problems.
                <br /> <br />
                Secondly, my focus shifted towards mobile development. I started tinkering with React Native and Flutter. I also started reading about cloud computing and how it can be used to build scalable applications. As setting up and scaling the apps is quite cumbersome so started finding how it can be used to automate these processes as well.
            </p>

            <h6 className={style.subtitle}>More than 500 hours of coding</h6>
            <div className={style.languages}>
                {languages500.map((language, index) => (
                    <div className={style.language} key={index}>
                        <img src={language.icon} alt={language.name} />
                        <div>{language.name}</div>
                    </div>
                ))}
            </div>

            <h6 className={style.subtitle}>Familiar with</h6>
            <div className={style.languages}>
                {languages100.map((language, index) => (
                    <div className={style.language} key={index}>
                        <img src={language.icon} alt={language.name} width={48} />
                        <div>{language.name}</div>
                    </div>
                ))}
            </div>

            <h5 className={style.heading}>Tools and Platforms</h5>
            <p className={style.text}>
                I have used a lot of tools and platforms to build and deploy my projects. I have also used them to automate the deployment process. These helped me to focus more on the development part rather than the deployment part.
            </p>

            <div className={style.languages}>
                {tools.map((tool, index) => (
                    <div className={style.language} key={index}>
                        <img src={tool.icon} alt={tool.name} />
                        <div>{tool.name}</div>
                    </div>
                ))}
            </div>








        </div>
    )
}

export default TechStack
import style from './About.module.css'

const About = () => {
    return (
        <div>
            <div className={style.borderBottom}>
                <img src="https://avatars.githubusercontent.com/u/20634589?v=4" alt="Prashul Jain" className={style.avatar} />
            </div>
            <p>Hi, I'm Prashul Jain. I'm a Staff Engineer at Highway 9 Networks. <br /> I'm currently working on cloud operation interface for a network management.</p>
            <>Working from around {new Date().getFullYear() - 2018} years in design and development of applications.</>
            <p>I'm a Computer Science graduate from Priyadarshini College of Engineering.</p>
            <p>I'm passionate about building products that make a difference.</p>
            <p>I love to read , travel and play video games</p>
            <p>Feel free to reach out to me at <a href="tel:+919406707245">+91-9406707245</a> or <a href="mailto:jainprashul@gmail.com ">jainprashul@gmail.com </a></p>

        </div>
    )
}

export default About
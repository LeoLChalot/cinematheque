import { v4 as uuidv4 } from "uuid";



export default function CustomNavbar({ brandLogo, links }) {
    return (
        <nav>
            {links.map((link) => (
                link.index === 0 ? <h1 className="neon neon-rouge navbar-brand" key={uuidv4()} data-text="Cinéma'tech">Cinéma'tech</h1> : null
            ))}
            {links.map((link) => (
                <a className={`navbar-link neon neon-${link.color}`} key={uuidv4()} href={link.path}>{link.title}</a>
            ))}
        </nav>
    );
}
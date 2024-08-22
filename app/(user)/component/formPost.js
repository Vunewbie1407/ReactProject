import { useState } from "react";

export default function FormPost() {
    const [slug, setSlug] = useState();
    const generateSlug = (text) => {
        const textNew = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return textNew.toLowerCase().replace(/\s+/g, "-");
      };
    const genSlug = (e) => {
        setSlug(generateSlug(e.target.value));
    }
    return (
        <>
            <form>
                <input type="text" placeholder="Title" onChange={genSlug} /> <br/>
                <input type="text" value={slug} placeholder="Slug" /> <br/>
                <input type="text" placeholder="Content" /> <br/>
            </form>
        </>
    );
}

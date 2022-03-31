import { useRouter } from "next/router";
import React from "react";
import markdownToHtml from "../../../lib/markdownToHtml";
import { getAllNotes, getNoteBySlug, getNoteSlugs } from "../../../lib/noteApi";
import { PostType } from "../../../lib/postApi";

type NotesProps = {
    note: PostType;
};
const Notes: React.FC<NotesProps> = ({ note }) => {
    // const router = useRouter();
    //@ts-ignore
    // const slug: string[] = router.query.slug || [];
    // console.log(slug);
    return (
        <div>
            <h1>note index sss</h1>
            {/* {slug.map((str, idx) => {
                return <h2 key={idx}>{str}</h2>;
            })} */}
            <h1>음 노트 시작!</h1>
            <h2>{note.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
        </div>
    );
};

//@ts-ignore
export const getStaticProps = async ({ params }) => {
    console.log(`params : slug = ${params}`);
    const note = getNoteBySlug(params.slug, [
        "title",
        "date",
        "slug",
        "author",
        "content",
        "ogImage",
        "coverImage",
    ]);
    const content = await markdownToHtml(note.content || "");

    return {
        props: {
            note: {
                ...note,
                content,
            },
        },
    };
};

export const getStaticPaths = async () => {
    const notesWithDirSlug = getAllNotes(["slug"]);
    let dirSlugs = Array.from(notesWithDirSlug.keys());

    let list: {
        params: {
            slug: string[];
        };
    }[] = [];

    dirSlugs.forEach((dirSlug, idx, array) => {
        const notes = notesWithDirSlug.get(dirSlug) || [];
        notes.forEach((note, idx, array) => {
            list.push({
                params: {
                    slug: [dirSlug, note.slug],
                },
            });
        });
    });
    console.log(list);

    return {
        paths: list,
        fallback: false,
    };
};
export default Notes;

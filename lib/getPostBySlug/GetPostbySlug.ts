import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getCompanyPostBySlug(slug: string) {
    try {
        const filePath = path.join(
            process.cwd(),
            "app/companies/company-blogs",
            `${slug.toLowerCase()}.mdx`
        );


        if (!fs.existsSync(filePath)) {
            return {
                frontmatter: {},
                content: "",
            };
        }

        const file = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(file);

        return {
            frontmatter: data ?? {},
            content: content ?? "",
        };
    } catch (error) {

        console.error(`Failed to load MDX for slug: ${slug}`, error);

        return {
            frontmatter: {},
            content: "",
        };
    }
}

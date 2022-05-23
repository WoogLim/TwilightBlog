import Image from "next/image";
import {
  SectionContainer,
  SectionWrap,
  AuthorCard,
  ContentsWrap,
  AuthorImage,
  AuthorInfo,
  AuthorName,
  PostDate,
  AuthorLinks,
  AuthorLink,
} from "../components/post/Section/Section.style";
import GiscusBox from "../components/giscus/giscus";
type PostType = {
  slug: string;
  title: string;
  date: Date;
  author: {
    name: string;
    picture: string;
  };
  content: string;
  ogImage: string;
  coverImage: string;
};

type PostsProps = {
  post: PostType;
};

export const PostLayout = ({ post }: PostsProps) => {
  return (
    <SectionContainer>
      <SectionWrap>
        <AuthorCard>
          <AuthorImage>
            {/* 나중에 배포시 Image 태그로 변경할 것 */}
            <img src={post.author.picture} />
          </AuthorImage>
          <AuthorInfo>
            <AuthorName>{post.author.name}</AuthorName>
            <PostDate>{post.date}</PostDate>
          </AuthorInfo>
          <AuthorLinks>
            <AuthorLink href="https://github.com/team-Twilight/TwilightBlog">
              <img src="https://dummyimage.com/40x40" alt="github" />
            </AuthorLink>
            <AuthorLink href="https://github.com/team-Twilight/TwilightBlog">
              <img src="https://dummyimage.com/40x40" alt="github" />
            </AuthorLink>
          </AuthorLinks>
        </AuthorCard>
        <ContentsWrap>
          <h2>{post.title}</h2>
          {post.content}
        </ContentsWrap>
        <GiscusBox slug={post.slug}/>
      </SectionWrap>
    </SectionContainer>
  );
};

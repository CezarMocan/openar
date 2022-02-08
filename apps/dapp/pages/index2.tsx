import type { ReactElement } from "react";
import Head from "next/head";

import { LayoutBlank } from "~/components/app";
import { ExhibitionSlide } from "~/components/frontend";

import { Box } from "@chakra-ui/react";

import { gql } from "@apollo/client";
import { getApolloClient } from "~/services/apolloClient";

export const Home = (props) => {
  const { exhibitions } = props;

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={`${props.pageTitle} · ${props.pageSlogan}`}
          key="title"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={props.pageDescription} />
      </Head>
       <Box
        width="calc(100vw-(100vw-100%))"
        height="100vh"
        scrollSnapType="y mandatory"
      >
        {exhibitions &&
          exhibitions?.map((exhibition: any, index: number) => (
            <ExhibitionSlide
              key={`ex-${index}`}
              exhibition={exhibition}
              beta={beta}
            />
          ))
        }
      </Box>
    </>
  );
};

// BACKUP: Previous StaticProps wihtout query
//====================================================

//export const getStaticProps = () => {
//  return {
//    props: {
//      pageTitle: "openAR",
//      pageSlogan: "The cooperative and crypto platform for AR artworks",
//      pageDescription:
//        "openAR makes it easy to exhibit, collect and discuss Augmented Reality (AR) works and allows artists to sell their works as NFTs. The open platform is organised as a cooperative, profits will be shared among the artists.",
//    },
//  };
//};

// WORKAROUND: Selective Exhibition query as workaround
//====================================================

// export const getStaticProps = async ({ params }: { params: any }) => {
//   const client = getApolloClient();

//   const exhibitionQuery = gql`
//     query ($slug: String!) {
//       exhibition(slug: $slug) {
//         id
//         slug
//         title
//         type
//         subtitle
//         description
//         dateBegin
//         dateEnd
//         status
//         curators {
//           orderNumber
//           user {
//             pseudonym
//             id
//             ethAddress
//             bio
//             profileImage {
//               id
//               status
//               meta
//             }
//           }
//         }
//         artworks {
//           id
//           key
//           title
//           description
//           creator {
//             pseudonym
//             ethAddress
//           }
//           heroImage {
//             id
//             meta
//             status
//           }
//           arObjects {
//             id
//             status
//             heroImage {
//               id
//               meta
//               status
//             }
//           }
//         }
//       }
//     }
//   `;

//   const { data } = await client.query({
//     query: exhibitionQuery,
//     variables: {
//       slug: 'openar-test',
//     },
//   });

//   return {
//     props: {
//       pageTitle: "openAR",
//       pageSlogan: "The cooperative and crypto platform for AR artworks",
//       pageDescription:
//         "openAR makes it easy to exhibit, collect and discuss Augmented Reality (AR) works and allows artists to sell their works as NFTs. The open platform is organised as a cooperative, profits will be shared among the artists.",
//       exhibition: data?.exhibition,
//     },
//     revalidate: 240,
//   };
// };

// TODO: Exhibitions (all current and upcoming?) query
//====================================================

export const getStaticProps = async ({ params }: { params: any }) => {
  const client = getApolloClient();

  const exhibitionQuery = gql`
    query {
      exhibitions {
        totalCount
        exhibitions {
          id
          slug
          title
          type
          imgUrl
          imgPosition
          subtitle
          description
          dateBegin
          dateEnd
          status
          curators {
            orderNumber
            user {
              pseudonym
              id
              ethAddress
              bio
              profileImage {
                id
                status
                meta
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: exhibitionQuery,
  });

  if (!data?.exhibitions?.totalCount) {
    return {
      notFound: true,
      revalidate: 240,
    };
  }

  return {
    props: {
      exhibitions: data?.exhibitions?.exhibitions,
      pageTitle: "openAR",
      pageSlogan: "The cooperative and crypto platform for AR artworks",
      pageDescription:
        "openAR makes it easy to exhibit, collect and discuss Augmented Reality (AR) works and allows artists to sell their works as NFTs. The open platform is organised as a cooperative, profits will be shared among the artists.",
    },
    revalidate: 240,
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutBlank>{page}</LayoutBlank>;
};

export default Home;

import { imageDeleteMutationGQL } from "~/graphql/mutations";

import { AspectRatio, Box, Button, Grid, Text } from "@chakra-ui/react";

import {
  FieldInput,
  FieldRow,
  FieldTextEditor,
  FieldImageUploader,
} from "~/components/forms";

import { yupIsFieldRequired, ModuelArtworkCreateSchema } from "../validation";
import { useRouter } from "next/router";
import { moduleArtworksConfig as moduleConfig } from "../config";

export const ModuleArtworkArObjectsForm = ({
  data,
  errors,
  validationSchema,
  disableNavigation,
  setActiveUploadCounter,
}: {
  data?: any;
  errors?: any;
  validationSchema: any;
  setActiveUploadCounter?: Function;
  disableNavigation?: Function;
}) => {
  const { artworkReadOwn } = data ?? {};
  const router = useRouter();

  const columns = { base: "100%", t: "50% 50%" };
  const rows = { base: "auto 1fr", t: "1fr" };

  return (
    <Box>
      <Button onClick={() => {
        router.push(`${moduleConfig.rootPath}/${router.query.aid}/create`);
      }}>Add Object</Button>
    </Box>
    // <Grid
    //   templateColumns={columns}
    //   templateRows={rows}
    //   minH="calc(100vh - 8rem)"
    // >
    //   <Box>
    //     <FieldRow>
    //       <FieldInput
    //         name="title"
    //         id="title"
    //         type="title"
    //         label="Title"
    //         isRequired={yupIsFieldRequired("title", validationSchema)}
    //         settings={{
    //           // defaultValue: data.abc.key
    //           placeholder: "What is the title of your artwork?",
    //         }}
    //       />
    //     </FieldRow>
    //     <FieldRow>
    //       <FieldTextEditor
    //         id="description"
    //         type="basic"
    //         name="description"
    //         label="Description"
    //         isRequired={yupIsFieldRequired("description", validationSchema)}
    //         settings={{
    //           maxLength: 500,
    //           defaultValue: artworkReadOwn?.description ? artworkReadOwn?.description : undefined,
    //           placeholder: "Please describe your artwork in a few words",
    //         }}
    //       />
    //     </FieldRow>
    //     <FieldRow>
    //       <FieldInput
    //         name="url"
    //         id="url"
    //         type="url"
    //         label="Url"
    //         isRequired={yupIsFieldRequired("url", validationSchema)}
    //         settings={{
    //           // defaultValue: data.abc.key
    //           placeholder: "Can people find more information somewhere else?",
    //         }}
    //       />
    //     </FieldRow>
    //     <FieldRow>
    //       <FieldInput
    //         name="video"
    //         id="video"
    //         type="video"
    //         label="Video"
    //         isRequired={yupIsFieldRequired("video", validationSchema)}
    //         settings={{
    //           // defaultValue: data.abc.key
    //           placeholder: "https://vimeo.com/... or https://youtube.com/...",
    //         }}
    //       />
    //     </FieldRow>
    //   </Box>
    //   <Box
    //     w={{ base: "50%", t: "auto" }}
    //     minH="100%"
    //     borderLeft="1px solid #fff"
    //     p="3"
    //   >
        
    //   </Box>
    // </Grid>
  );
};
export default ModuleArtworkArObjectsForm;
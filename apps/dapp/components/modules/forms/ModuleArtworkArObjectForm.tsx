import { arModelDeleteMutationGQL, imageDeleteMutationGQL } from "~/graphql/mutations";

import { AspectRatio, Box, Grid, Text } from "@chakra-ui/react";

import {
  FieldInput,
  FieldRow,
  FieldTextEditor,
  FieldImageUploader,
  FieldModelUploader,
} from "~/components/forms";


import { yupIsFieldRequired } from "../validation";

export const ModuleArtworkArObjectForm = ({
  action,
  data,
  errors,
  validationSchema,
  disableNavigation,
  setActiveUploadCounter,
}: {
  action: string;
  data?: any;
  errors?: any;
  validationSchema: any;
  setActiveUploadCounter?: Function;
  disableNavigation?: Function;
}) => {
  const { arObjectReadOwn } = data ?? {};

  const columns = { base: "100%", t: "50% 50%" };
  const rows = { base: "auto 1fr", t: "1fr" };

  return (
    <Grid
      templateColumns={columns}
      templateRows={rows}
      minH="calc(100vh - 8rem)"
    >
      <Box>
        <FieldRow>
          <FieldInput
            name="title"
            id="title"
            type="title"
            label="Object title"
            isRequired={yupIsFieldRequired("title", validationSchema)}
            settings={{
              // defaultValue: data.abc.key
              placeholder: "What is the title of your artwork?",
            }}
          />
        </FieldRow>
        <FieldRow>
          <FieldTextEditor
            id="description"
            type="basic"
            name="description"
            label="Additional description"
            isRequired={yupIsFieldRequired("description", validationSchema)}
            settings={{
              maxLength: 500,
              defaultValue: arObjectReadOwn?.description
                ? arObjectReadOwn?.description
                : undefined,
              placeholder: "Please describe your artwork in a few words",
            }}
          />
        </FieldRow>
        <FieldRow>
          <FieldInput
            name="askPrice"
            id="askPrice"
            type="askPrice"
            label="Initial ask price"
            isRequired={yupIsFieldRequired("askPrice", validationSchema)}
            settings={{
              // defaultValue: data.abc.key
              placeholder: "How much would you ask for on the first sales",
            }}
          />
        </FieldRow>
        <FieldRow>
          <FieldInput
            name="editionOf"
            id="editionOf"
            type="editionOf"
            label="Editon of"
            isRequired={yupIsFieldRequired("editionOf", validationSchema)}
            settings={{
              // defaultValue: data.abc.key
              placeholder: "How many NFTs of this object should be minted?",
            }}
          />
        </FieldRow>
        <FieldRow>
          <FieldInput
            name="orderNumber"
            id="orderNumber"
            type="orderNumber"
            label="Order Number"
            isRequired={yupIsFieldRequired("orderNumber", validationSchema)}
            settings={{
              // defaultValue: data.abc.key
              placeholder: "The object is number ... in the artwork listing",
            }}
          />
        </FieldRow>
      </Box>
      <Box
        w={{ base: "50%", t: "auto" }}
        minH="100%"
        borderLeft="1px solid #fff"
        p="3"
      >
        {action === "create" && (
          <AspectRatio
            ratio={1}
            border="5px dashed var(--chakra-colors-openarGreen-400)"
          >
            <Box textAlign="center" p="10" color="openarGreen.500">
              Please save a draft to unlock image and model upload
            </Box>
          </AspectRatio>
        )}
        {action === "update" && (
          <>
            <FieldImageUploader
              route="image"
              id="heroImage"
              name="heroImage"
              label="Featured Image"
              isRequired={yupIsFieldRequired(
                "heroImage",
                validationSchema
              )}
              setActiveUploadCounter={setActiveUploadCounter}
              deleteButtonGQL={imageDeleteMutationGQL}
              connectWith={{
                heroImageArObjects: {
                  connect: {
                    id: arObjectReadOwn.id,
                  },
                },
              }}
              settings={{
                minFileSize: 1024 * 1024 * 0.0488,
                maxFileSize: 1024 * 1024 * 2,
                aspectRatioPB: 100, // % bottom padding

                image: {
                  status: arObjectReadOwn?.heroImage?.status,
                  id: arObjectReadOwn?.heroImage?.id,
                  meta: arObjectReadOwn?.heroImage?.meta,
                  alt: `Featured Image`,
                  forceAspectRatioPB: 100,
                  showPlaceholder: true,
                  sizes: "(min-width: 45em) 20v, 95vw",
                },
              }}
            />

            <FieldModelUploader
              route="model"
              id="modelGlb"
              type="glb"
              name="modelGlb"
              label="Ar Model (.glb/.gltf)"
              isRequired={yupIsFieldRequired(
                "modelGlb",
                validationSchema
              )}
              setActiveUploadCounter={setActiveUploadCounter}
              deleteButtonGQL={arModelDeleteMutationGQL}
              connectWith={{
                arObject: {
                  connect: {
                    id: arObjectReadOwn.id,
                  },
                },
              }}
              settings={{
                minFileSize: 1024 * 1024 * 0.0488,
                maxFileSize: 1024 * 1024 * 50,
                accept: ".glb",
                // model: {
                //   // status: arObjectReadOwn?.heroImage?.status,
                //   // id: arObjectReadOwn?.heroImage?.id,
                //   // meta: arObjectReadOwn?.heroImage?.meta,
                //   showPlaceholder: true,
                // },
              }}
            />
          </>
        )}
      </Box>
    </Grid>
  );
};
export default ModuleArtworkArObjectForm;
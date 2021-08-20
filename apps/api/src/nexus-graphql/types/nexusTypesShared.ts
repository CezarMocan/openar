/// <reference path="../../types/nexus-typegen.ts" />

import {
  objectType,
  asNexusMethod,
  inputObjectType,
  extendType,
  stringArg,
  intArg,
  arg,
  nonNull,
} from "nexus";
import {
  GraphQLDateTime,
  GraphQLJSON,
  GraphQLJWT,
  GraphQLEmailAddress,
} from "graphql-scalars";
import { PermissionNames } from "../../apiuser";
import { authorizeApiUser } from "../helpers";

export const GQLDateTime = asNexusMethod(GraphQLDateTime, "date");
export const GQLJson = asNexusMethod(GraphQLJSON, "json");
export const GQLJwt = asNexusMethod(GraphQLJWT, "jwt");
export const GQLEmailAddress = asNexusMethod(GraphQLEmailAddress, "email");

export const BooleanResult = objectType({
  name: "BooleanResult",
  definition(t) {
    t.nonNull.boolean("result");
  },
});

export const GeoPoint = objectType({
  name: "GeoPoint",
  definition(t) {
    t.float("lat");
    t.float("lng");
  },
});

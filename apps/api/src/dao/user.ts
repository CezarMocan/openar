// import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { User, Prisma } from "@prisma/client";

import {
  ApiError,
  filteredOutputByBlacklistOrNotFound,
  filteredOutputByBlacklist,
} from "../utils";
import { getApiConfig } from "../config";
import { getPrismaClient } from "../db/client";
import { daoImageSetToDelete } from "./image";

const apiConfig = getApiConfig();
const prisma = getPrismaClient();

export const daoUserCheckIsEmailTaken = async (
  email: string,
  id?: number | undefined
): Promise<boolean> => {
  let where: Prisma.UserWhereInput = {
    email,
  };

  if (id && !Number.isNaN(id)) {
    where = {
      ...where,
      id: {
        not: id,
      },
    };
  }

  const count = await prisma.user.count({
    where,
  });

  return count > 0;
};

export const daoUserCreate = async (
  data: Prisma.UserCreateInput
): Promise<User> => {
  // if (await daoUserCheckIsEmailTaken(data.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  // }

  const user: User = await prisma.user.create({
    data: {
      ...data,
      // ...{ TODO: what needs to come here?
      //   password: await bcrypt.hash(
      //     data.password,
      //     apiConfig.security.saltRounds
      //   ),
      // },
    },
  });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserQuery = async (
  where: Prisma.UserWhereInput,
  orderBy: any,
  pageIndex: number = 0,
  pageSize: number = apiConfig.db.defaultPageSize
): Promise<User[]> => {
  const users: User[] = await prisma.user.findMany({
    where,
    orderBy,
    skip: pageIndex * pageSize,
    take: Math.min(pageSize, apiConfig.db.maxPageSize),
  });

  return filteredOutputByBlacklist(
    users,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserFindFirst = async (
  where: Prisma.UserWhereInput,
  include?: Prisma.UserInclude | undefined
): Promise<User> => {
  const user = await prisma.user.findFirst({
    where,
    include,
  });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserQueryCount = async (
  where: Prisma.UserWhereInput
): Promise<number> => {
  return prisma.user.count({
    where,
  });
};

export const daoUserGetById = async (id: number): Promise<User> => {
  const user: User | null = await prisma.user.findUnique({ where: { id } });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserGetByEthAddress = async (
  ethAddress: string
): Promise<User> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      ethAddress,
    },
  });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserFindByEthAddress = async (
  ethAddress: string
): Promise<User> => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      ethAddress,
    },
  });

  return filteredOutputByBlacklist(user, apiConfig.db.privateJSONDataKeys.user);
};

export const daoUserUpdate = async (
  id: number,
  data: Prisma.UserUpdateInput
): Promise<User> => {
  const updateData = data;

  if (await daoUserCheckIsEmailTaken(`${data.email ?? ""}`, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  // TODO: will there be anything to replace the password
  // if (data.password)
  //   updateData = {
  //     ...data,
  //     ...{
  //       password: await bcrypt.hash(
  //         data.password as string,
  //         apiConfig.security.saltRounds
  //       ),
  //     },
  //   };

  const user: User = await prisma.user.update({
    data: updateData,
    where: {
      id,
    },
  });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserDelete = async (id: number): Promise<User> => {
  const user: User = await prisma.user.delete({
    where: {
      id,
    },
  });

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export const daoUserProfileImageDelete = async (
  imageId: number,
  userId: number
): Promise<User> => {
  const user: User = await prisma.user.update({
    data: {
      profileImage: {
        disconnect: true,
      },
    },
    where: {
      id: userId,
    },
  });

  await daoImageSetToDelete(imageId);

  return filteredOutputByBlacklistOrNotFound(
    user,
    apiConfig.db.privateJSONDataKeys.user
  );
};

export default {
  daoUserCreate,
  daoUserQuery,
  daoUserQueryCount,
  daoUserGetById,
  daoUserUpdate,
  daoUserDelete,
  daoUserFindFirst,
  daoUserProfileImageDelete,
  daoUserCheckIsEmailTaken,
  daoUserGetByEthAddress,
  daoUserFindByEthAddress,
};

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getMypage,
  updateUsername,
  getProfileUploadUrl,
  updateProfileImage,
} from "@/apis/mypageApi";

import { queryKeys } from "./queryKeys";

export const useMypage = () =>
  useQuery({
    queryKey: queryKeys.mypage.detail(),
    queryFn: getMypage,
  });

export const useUpdateUsername = () =>
  useMutation({
    mutationFn: updateUsername,
  });

export const useProfileUploadUrl = () =>
  useQuery({
    queryKey: queryKeys.mypage.profileUploadUrl(),
    queryFn: getProfileUploadUrl,
  });

export const useUpdateProfileImage = () =>
  useMutation({
    mutationFn: updateProfileImage,
  });

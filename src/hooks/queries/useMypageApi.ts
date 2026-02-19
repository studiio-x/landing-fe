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
    retry: false,
  });

export const useUpdateUsername = () =>
  useMutation({
    mutationFn: updateUsername,
  });

export const useUpdateProfileImage = () =>
  useMutation({
    mutationFn: updateProfileImage,
  });

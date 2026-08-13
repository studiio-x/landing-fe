import { useMutation, useQuery } from "@tanstack/react-query";

import { getMypage, updateUsername } from "@/apis/mypageApi";

import { queryKeys } from "./queryKeys";

export const useMypage = () =>
  useQuery({
    queryKey: queryKeys.mypage.detail(),
    queryFn: getMypage,
    retry: false,
    staleTime: 60 * 1000,
  });

export const useUpdateUsername = () =>
  useMutation({
    mutationFn: updateUsername,
  });

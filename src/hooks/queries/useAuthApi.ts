import { useMutation } from "@tanstack/react-query";

import {
  signup,
  login,
  verifyEmail,
  sendVerificationEmail,
} from "@/apis/authApi";

export const useSignup = () =>
  useMutation({
    mutationFn: signup,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: verifyEmail,
  });

export const useSendVerificationEmail = () =>
  useMutation({
    mutationFn: sendVerificationEmail,
  });

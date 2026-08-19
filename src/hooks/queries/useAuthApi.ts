import { useMutation } from "@tanstack/react-query";

import { signup, login, sendVerificationEmail, checkEmailValidation, sendPasswordEmailVerification, verifyPasswordCode, resetPassword } from "@/apis/authApi";

export const useSignup = () =>
  useMutation({
    mutationFn: signup,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useSendVerificationEmail = () =>
  useMutation({
    mutationFn: sendVerificationEmail,
  });

export const useCheckEmailValidation = () =>
  useMutation({
    mutationFn: checkEmailValidation,
  });

export const useSendPasswordEmailVerification = () =>
  useMutation({
    mutationFn: sendPasswordEmailVerification,
  });

export const useVerifyPasswordCode = () =>
  useMutation({
    mutationFn: verifyPasswordCode,
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPassword,
  });


import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  return true;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data.session;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
};

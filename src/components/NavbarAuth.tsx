"use client";

import { NavbarSenhaLink } from './NavbarSenhaLink';
import { NavbarSairButton } from './NavbarSairButton';

/**
 * Agrupa os botões de Senha e Sair para uso no Desktop
 * No mobile, usar NavbarSenhaLink e NavbarSairButton separadamente
 */
export function NavbarAuth() {
  return (
    <>
      <NavbarSenhaLink />
      <NavbarSairButton />
    </>
  );
}
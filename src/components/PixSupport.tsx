'use client';

import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

const pixKey = '44707136000101';
const valor = '1.00';
const nome = 'ONG Abraca Vidas';
const cidade = 'ARARAQUARA';
const descricao = 'Apoio ao projeto';

// Payload PIX baseado no formato original que funcionava
// Apenas corrigindo os tamanhos para os novos valores:
// - Chave: UUID 36 chars → CNPJ 14 chars (0136 → 0114, campo 26: 58 → 36)
// - Nome: "Alexandre Morais" 16 chars → "ONG Abraca Vidas" 17 chars (5916 → 5917)
// - Cidade: "SAO PAULO" 9 chars → "ARARAQUARA" 10 chars (6009 → 6010)

// Calcula CRC16-CCITT (mesmo algoritmo do padrão EMV)
const calcularCRC16 = (payload) => {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

// Monta payload sem o CRC (tudo exceto os últimos 4 dígitos)
// Nome "ONG Abraca Vidas" = 16 caracteres (não 17!)
const payloadSemCRC = `00020126360014BR.GOV.BCB.PIX0114${pixKey}5204000053039865404${valor}5802BR5916${nome}6010${cidade}621405107wQwNucsGM6304`;

// Calcula CRC e monta payload final
const crcCalculado = calcularCRC16(payloadSemCRC);
const payload = payloadSemCRC + crcCalculado;

export default function PixSupport() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size='lg' className="bg-green-500 hover:bg-green-600 text-white font-bold w-28">
          Apoiar via Pix
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn z-40" aria-hidden="true" />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 z-50"
          aria-labelledby="pix-modal-title"
          aria-describedby="pix-modal-description"
        >
          <Dialog.Title id="pix-modal-title" className="text-xl font-bold mb-2 text-center">
            Apoie o Projeto
          </Dialog.Title>
          <Dialog.Description id="pix-modal-description" className="text-sm text-gray-600 text-center mb-4">
            Use o QR Code para apoiar com R$ {valor}
          </Dialog.Description>
          <div className="flex justify-center mb-4" role="img" aria-label={`QR Code Pix para doação de R$ ${valor} - Chave CNPJ ${pixKey}`}>
            <QRCodeSVG value={payload} size={180} />
          </div>

          <p className="text-sm text-center text-gray-600">Ou copie a chave Pix:</p>
          <div className="flex items-center justify-center mt-1 gap-2">
            <code className="bg-gray-100 px-2 py-1 rounded" aria-label="Chave Pix CNPJ">{pixKey}</code>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800"
              aria-label={copied ? "Chave copiada!" : "Copiar chave Pix"}
              type="button"
            >
              {copied ? <CheckIcon size={18} aria-hidden="true" /> : <CopyIcon size={18} aria-hidden="true" />}
            </button>
          </div>
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
            className="sr-only"
          >
            {copied ? "Chave Pix copiada para a área de transferência" : ""}
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="mt-6 w-full text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              aria-label="Fechar modal de doação"
            >
              Fechar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

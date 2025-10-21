'use client';

import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

const pixKey = '0532c395-6d23-4046-92d7-ddd07bdbe59e';
const valor = '1.00';
const nome = 'Alexandre Morais';
const cidade = 'SAO PAULO';
const descricao = 'Apoio ao projeto';

const payload = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865404${valor}5802BR5916${nome}6009${cidade}621405107wQwNucsGM63040D76`;

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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 z-50">
          <Dialog.Title className="text-xl font-bold mb-2 text-center">Apoie o Projeto</Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 text-center mb-4">
              Use o QR Code para apoiar com R$ {valor}
            </Dialog.Description>
          <div className="flex justify-center mb-4">
            <QRCodeSVG value={payload} size={180} />
          </div>

          <div className="text-sm text-center text-gray-600">Ou copie a chave Pix:</div>
          <div className="flex items-center justify-center mt-1 gap-2">
            <code className="bg-gray-100 px-2 py-1 rounded">{pixKey}</code>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800"
              title="Copiar chave Pix"
            >
              {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="mt-6 w-full text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Fechar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


import { FAQItem, Feature, ModelVariant, Testimonial } from './types';

export const HERO_IMAGES: string[] = [
  '/Imagens_12/D_NQ_NP_2X_617345-MLB94135291932_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_768523-MLB94135351612_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_779414-MLB94135948572_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_853952-MLB94135699852_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_797140-MLB94563799901_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_899544-MLB94563810129_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_913378-MLB94563660509_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
  '/Imagens_12/D_NQ_NP_2X_952383-MLB94563401643_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp'
];

export const FEATURES: Feature[] = [
  {
    icon: 'bolt',
    title: 'Motor 1000W para uso urbano',
    description: 'Resposta rápida para deslocamentos no dia a dia, incluindo trechos com subida moderada.',
    color: 'primary'
  },
  {
    icon: 'battery_charging_full',
    title: 'Recarga em tomada comum',
    description: 'Bateria removível para recarregar em casa ou no trabalho sem estrutura especial.',
    color: 'accent-blue'
  },
  {
    icon: 'verified',
    title: 'Pagamento na entrega',
    description: 'Você confirma o recebimento e paga com mais segurança no momento da entrega.',
    color: 'gradient'
  }
];

export const MODEL_VARIANTS: ModelVariant[] = [
  {
    id: 'x12-carbono',
    name: 'X12 Carbono',
    finish: 'Acabamento carbono',
    image: '/Imagens_12/carbono_D_NQ_NP_2X_899648-MLB94133584538_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Carbono e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  },
  {
    id: 'x12-preto',
    name: 'X12 Preto',
    finish: 'Acabamento preto',
    image: '/Imagens_12/preto_D_NQ_NP_2X_913378-MLB94563660509_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido (1).webp',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Preto e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  },
  {
    id: 'x12-vermelha',
    name: 'X12 Vermelha',
    finish: 'Acabamento vermelho',
    image: '/Imagens_12/vermelho_D_NQ_NP_2X_787790-MLB94067531978_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Vermelha e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  },
  {
    id: 'x12-branco',
    name: 'X12 Branco',
    finish: 'Acabamento branco',
    image: '/Imagens_12/branco_moto.jpeg',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Branco e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  },
  {
    id: 'x12-azul',
    name: 'X12 Azul',
    finish: 'Acabamento azul',
    image: '/Imagens_12/azul_D_NQ_NP_2X_959672-MLB94561941731_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Azul e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  },
  {
    id: 'x12-inglaterra',
    name: 'X12 Inglaterra',
    finish: 'Acabamento inglaterra',
    image: '/Imagens_12/inglaterra_D_NQ_NP_2X_730725-MLB94134051742_102025-F-moto-scooter-x12-eletrica-1000w-32kmh-sem-cnh-autopropelido.webp',
    whatsappMessage: 'Olá, quero detalhes da X12 modelo Inglaterra e condições de pagamento na entrega.',
    specs: ['Motor 1000W', 'Autonomia até 50 km', 'Velocidade até 32 km/h']
  }
];

export const HOW_IT_WORKS_STEPS: string[] = [
  'Você clica no WhatsApp e fala com o atendimento.',
  'Recebe fotos, vídeo real e confirma disponibilidade da X12.',
  'Define entrega no seu endereço com prazo informado.',
  'Confere o produto no recebimento e realiza o pagamento.'
];

export const TRUST_ITEMS: string[] = [
  'Sem pagamento antecipado.',
  'Confirmação de pedido por WhatsApp.',
  'Atendimento direto para dúvidas antes da entrega.'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    avatar: '/Imagens_12/avatars/carlosfotos.png',
    role: 'Entregador',
    content: 'Uso a X12 para trajetos curtos todos os dias. O processo de compra foi simples e o pagamento na entrega passou confiança.',
    rating: 5
  },
  {
    id: '2',
    name: 'Amanda Souza',
    avatar: '/Imagens_12/avatars/renata.png',
    role: 'Estudante',
    content: 'Atendeu bem minha rotina de casa, faculdade e trabalho. O contato no WhatsApp foi rápido e objetivo.',
    rating: 5
  },
  {
    id: '3',
    name: 'Ricardo Mendes',
    avatar: '/Imagens_12/avatars/arthur.png',
    role: 'Comercial',
    content: 'Queria reduzir custo de deslocamento urbano. Recebi as informações antes e paguei somente ao receber.',
    rating: 4
  }
];

export const FAQ: FAQItem[] = [
  {
    question: 'Precisa de CNH?',
    answer:
      'Conforme a Resolução CONTRAN nº 996/2023, equipamentos autopropelidos (como scooters elétricas) de até 1000W e velocidade máxima de até 32 km/h, em regra, não exigem CNH, emplacamento ou registro no Detran. Devem circular em ciclovias/ciclofaixas (ou no bordo da pista quando não houver), com itens de segurança e sinalização obrigatórios. Acima desses limites, o veículo pode ser enquadrado como ciclomotor, exigindo habilitação (ACC/A), emplacamento e licenciamento. Alterações para aumento de velocidade podem descaracterizar a categoria legal. Sempre confirme a aplicação local junto ao Detran e ao órgão de trânsito do município.'
  },
  {
    question: 'Qual autonomia da X12?',
    answer: 'Até 50 km por carga, variando conforme peso, relevo e forma de condução.'
  },
  {
    question: 'Como funciona o pagamento na entrega?',
    answer: 'O pedido é confirmado no WhatsApp e o pagamento é feito somente após conferência no recebimento.'
  },
  {
    question: 'Qual o prazo de recarga?',
    answer: 'Em média de 6 a 8 horas em tomada convencional.'
  }
];

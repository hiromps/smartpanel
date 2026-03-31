import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@smartpanel.jp";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    const passwordHash = await hashPassword("demo1234");

    const paymentMethod = await prisma.paymentMethod.upsert({
      where: { code: "bank_transfer" },
      update: {},
      create: {
        code: "bank_transfer",
        name: "銀行振込",
      },
    });

    const category = await prisma.serviceCategory.upsert({
      where: { slug: "instagram-engagement" },
      update: {},
      create: {
        name: "Instagram エンゲージメント",
        slug: "instagram-engagement",
        sortOrder: 1,
      },
    });

    const provider = await prisma.provider.create({
      data: {
        name: "Demo Provider",
        apiBaseUrl: "https://provider.example.com/api",
      },
    });

    const providerService = await prisma.providerService.create({
      data: {
        providerId: provider.id,
        externalServiceId: "ig-likes-001",
        name: "Instagram いいね 100",
        rate: 500,
        minQuantity: 100,
        maxQuantity: 10000,
      },
    });

    const service = await prisma.service.upsert({
      where: { slug: "instagram-likes-100" },
      update: {},
      create: {
        categoryId: category.id,
        providerServiceId: providerService.id,
        name: "Instagram いいねブースト",
        slug: "instagram-likes-100",
        description: "Instagram投稿向けのデモサービスです。",
        price: 1200,
        cost: 500,
        minQuantity: 100,
        maxQuantity: 10000,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "デモユーザー",
        email,
        passwordHash,
        wallet: {
          create: {
            balance: 15000,
            transactions: {
              create: [
                { amount: 10000, kind: "deposit", note: "初回チャージ" },
                { amount: 5000, kind: "bonus", note: "キャンペーン付与" },
              ],
            },
          },
        },
      },
      include: { wallet: true },
    });

    await prisma.depositRequest.create({
      data: {
        userId: user.id,
        paymentMethodId: paymentMethod.id,
        amount: 5000,
        status: "APPROVED",
      },
    });

    await prisma.order.createMany({
      data: [
        {
          userId: user.id,
          serviceId: service.id,
          quantity: 500,
          chargeAmount: 2400,
          targetUrl: "https://instagram.com/p/demo1",
          status: "PROCESSING",
        },
        {
          userId: user.id,
          serviceId: service.id,
          quantity: 1000,
          chargeAmount: 4800,
          targetUrl: "https://instagram.com/p/demo2",
          status: "COMPLETED",
        },
      ],
    });

    const ticket = await prisma.ticket.create({
      data: {
        userId: user.id,
        subject: "入金反映について",
        status: "ANSWERED",
      },
    });

    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        senderType: "staff",
        body: "入金確認を行い、残高へ反映しました。",
      },
    });

    await prisma.apiKey.create({
      data: {
        userId: user.id,
        name: "Main API Key",
        keyHash: "demo-key-hash",
      },
    });
  }

  console.log("Seed complete: demo@smartpanel.jp / demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

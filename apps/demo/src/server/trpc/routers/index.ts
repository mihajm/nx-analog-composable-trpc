import trpc, { TRPCCreateParams } from '@test/server/trpc/util/t';
import { createNoteRouter } from '@test/shared/note/data-access/note-router';
import { Context } from '../context';

const params = undefined satisfies TRPCCreateParams<Context>;

const t = trpc(params, ({ procedure, router }) => {
  return {
    router,
    publicProcedure: procedure,
    protectedProcedure: procedure,
  };
});

const base = t.router({
  hello: t.publicProcedure.query(() => 'Hello'),
  note: createNoteRouter(t),
});

export const appRouter = base;

// export type definition of API
export type AppRouter = typeof appRouter;

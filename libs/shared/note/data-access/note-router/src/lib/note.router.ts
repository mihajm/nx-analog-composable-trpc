import { CreateTRPCProxyClient } from '@test/server/trpc/model/client-proxy';
import { TRPCCreateParams, TRPCFactories } from '@test/server/trpc/util/t';
import { z } from 'zod';

type Note = {
  id: number;
  note: string;
  createdAt: string;
};

let noteId = 0;
const notes: Note[] = [];

export const createNoteRouter = <
  CTX extends object,
  P extends TRPCCreateParams<CTX>
>({
  router,
  publicProcedure,
}: TRPCFactories<CTX, P>) => {
  return router({
    create: publicProcedure
      .input(
        z.object({
          title: z.string(),
        })
      )
      .mutation(({ input }) =>
        notes.push({
          id: noteId++,
          note: input.title,
          createdAt: new Date().toISOString(),
        })
      ),
    list: publicProcedure.query(() => notes),
    remove: publicProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(({ input }) => {
        const index = notes.findIndex((note) => input.id === note.id);
        notes.splice(index, 1);
      }),
  });
};

export type NoteRouter<
  CTX extends object = object,
  P extends TRPCCreateParams<CTX> = undefined
> = {
  note: CreateTRPCProxyClient<ReturnType<typeof createNoteRouter<CTX, P>>>;
};

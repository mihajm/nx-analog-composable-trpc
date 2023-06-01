import { initTRPC } from '@trpc/server';

function context<CTX extends object>() {
  return initTRPC.context<CTX>();
}

export type TRPCCreateParams<CTX extends object> = Parameters<
  ReturnType<typeof context<CTX>>['create']
>[0];

function init<CTX extends object, P extends TRPCCreateParams<CTX>>(params: P) {
  return initTRPC.context<CTX>().create(params);
}

export type TRPCFactories<
  CTX extends object = object,
  P extends TRPCCreateParams<CTX> = undefined
> = {
  publicProcedure: ReturnType<typeof init<CTX, P>>['procedure'];
  protectedProcedure: ReturnType<typeof init<CTX, P>>['procedure'];
  router: ReturnType<typeof init<CTX, P>>['router'];
};

type SetupFn<
  CTX extends object,
  P extends TRPCCreateParams<CTX> = undefined
> = (t: ReturnType<typeof init<CTX, P>>) => TRPCFactories<CTX>;

function factory<CTX extends object, P extends TRPCCreateParams<CTX>>(
  params: P,
  resolve: SetupFn<CTX, P>
) {
  return resolve(init<CTX, P>(params));
}

export default factory;

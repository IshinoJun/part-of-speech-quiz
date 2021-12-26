import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

interface State {
  idx: number;
}

/**
 * ページ遷移を止めるためにスローする
 */
const throwFakeErrorToFoolNextRouter = (): never => {
  throw 'Abort route change. Please ignore this error.';
};

const isIdx = (value: unknown): value is State => {
  const target = value as State;
  return 'idx' in target && typeof target.idx === 'number';
};

export const useWarningOnExit = (shouldWarn: boolean): void => {
  const router = useRouter();
  const lastHistoryState = useRef<{ idx: number } | null>(null);

  const message = 'Are you sure that you want to leave?';

  const storeLastHistoryState = useCallback((): void => {
    lastHistoryState.current = isIdx(history.state) ? history.state : null;
  }, []);

  useEffect(() => {
    storeLastHistoryState();
  }, [storeLastHistoryState]);

  useEffect(() => {
    router.events.on('routeChangeComplete', storeLastHistoryState);

    return (): void => {
      router.events.off('routeChangeComplete', storeLastHistoryState);
    };
  }, [router, storeLastHistoryState]);

  /**
   * HACK: - idxはドキュメントに記載がないので本来使うべきではない
   * issueでもまだ議論されているので、一旦この暫定対応で進める
   * https://github.com/vercel/next.js/issues/2476#issuecomment-850030407
   */
  const revertTheChangeRouterJustMade = useCallback(() => {
    const prevState = lastHistoryState.current;
    const currentState = isIdx(history.state) ? history.state : null;

    if (
      prevState !== null &&
      currentState !== null &&
      prevState.idx !== currentState.idx
    ) {
      history.go(prevState.idx < currentState.idx ? -1 : 1);
    }
  }, []);

  const killRouterEvent = useCallback(() => {
    router.events.emit('routeChangeError');

    revertTheChangeRouterJustMade();
    throwFakeErrorToFoolNextRouter();
  }, [revertTheChangeRouterJustMade, router]);

  useEffect(() => {
    let isWarned = false;

    const routeChangeStart = (url: string): void => {
      if (router.asPath !== url && shouldWarn && !isWarned) {
        isWarned = true;

        if (window.confirm(message)) {
          void router.push(url);
          return;
        }

        isWarned = false;
        killRouterEvent();
      }
    };

    const beforeUnload = (e: BeforeUnloadEvent): string | null => {
      if (shouldWarn && !isWarned) {
        const event = e ?? window.event;
        event.returnValue = message;
        return message;
      }
      return null;
    };

    router.events.on('routeChangeStart', routeChangeStart);
    window.addEventListener('beforeunload', beforeUnload);

    return (): void => {
      router.events.off('routeChangeStart', routeChangeStart);
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [message, shouldWarn, killRouterEvent, router]);
};

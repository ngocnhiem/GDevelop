// @flow

import * as React from 'react';
import { action } from '@storybook/addon-actions';

import paperDecorator from '../../PaperDecorator';
import { GameThumbnailVideo } from '../../../GameDashboard/GameThumbnailVideo';
import {
  fakeSilverAuthenticatedUser,
  game1,
  getPublicGameFromGame,
} from '../../../fixtures/GDevelopServicesTestData';
import AuthenticatedUserContext from '../../../Profile/AuthenticatedUserContext';
import PreviewVideoRecordingContext from '../../../MainFrame/PreviewVideoRecordingContext';

export default {
  title: 'GameDashboard/GameThumbnailVideo',
  component: GameThumbnailVideo,
  decorators: [paperDecorator],
};

const sampleVideoUrl =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const Wrapper = ({
  isProjectOpened,
  children,
}: {|
  isProjectOpened: boolean,
  children: React.Node,
|}) => (
  <AuthenticatedUserContext.Provider value={fakeSilverAuthenticatedUser}>
    <PreviewVideoRecordingContext.Provider
      value={{
        currentProjectGameId: isProjectOpened ? game1.id : null,
        onRecordPreviewVideo: async () => action('onRecordPreviewVideo')(),
      }}
    >
      {children}
    </PreviewVideoRecordingContext.Provider>
  </AuthenticatedUserContext.Provider>
);

export const NoVideo = (): React.Node => (
  <Wrapper isProjectOpened>
    <GameThumbnailVideo publicGame={getPublicGameFromGame(game1)} />
  </Wrapper>
);

export const RecordedAutomatically = (): React.Node => (
  <Wrapper isProjectOpened>
    <GameThumbnailVideo
      publicGame={{
        ...getPublicGameFromGame(game1),
        previewVideoUrls: [sampleVideoUrl],
      }}
    />
  </Wrapper>
);

export const RecordedByTheCreator = (): React.Node => (
  <Wrapper isProjectOpened>
    <GameThumbnailVideo
      publicGame={{
        ...getPublicGameFromGame(game1),
        thumbnailVideoUrl: sampleVideoUrl,
      }}
    />
  </Wrapper>
);

export const ProjectNotOpened = (): React.Node => (
  <Wrapper isProjectOpened={false}>
    <GameThumbnailVideo
      publicGame={{
        ...getPublicGameFromGame(game1),
        thumbnailVideoUrl: sampleVideoUrl,
      }}
    />
  </Wrapper>
);

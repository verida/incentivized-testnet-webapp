/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from "react";

import { Typography } from "~/components/atoms";

type TermsAndConditionsProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>;

export const TermsAndConditions: React.FunctionComponent<
  TermsAndConditionsProps
> = (props) => {
  return (
    <div {...props}>
      <Typography variant="h2" component="p">
        Verida DAO
      </Typography>
      <Typography variant="h2">
        Participation Incentives Program Terms
      </Typography>

      <Typography>Effective Date: 23 May 2023</Typography>

      <Typography variant="h3">1. Important Information</Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>

      <Typography variant="h3">2. About Verida Foundation DAO</Typography>

      <Typography variant="h5" component="h4">
        Overview
      </Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>

      <Typography variant="h5" component="h4">
        Governance
      </Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>

      <Typography variant="h3">3. Risks</Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>

      <Typography variant="h3">
        4. How to interact with the Particpation Incentives Program
      </Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>

      <Typography variant="h3">5. Additional Information</Typography>

      <Typography>
        Deserunt dolor minim consequat mollit cillum Lorem velit velit ex. Do
        qui Lorem veniam sunt reprehenderit culpa veniam minim adipisicing
        fugiat commodo eu sint velit mollit. Reprehenderit est esse laboris
        excepteur eiusmod culpa adipisicing consectetur cillum amet nisi nulla
        exercitation consectetur sint. Aliqua sint eu fugiat dolor cupidatat
        occaecat amet veniam laboris duis exercitation laboris minim. Ullamco
        duis nisi fugiat. Eu velit ea velit. Magna pariatur ad amet laborum id
        dolor. Ipsum minim irure laborum ex excepteur non consectetur fugiat.
        Amet sunt consectetur aute. Sunt consequat Lorem est aliqua officia
        proident mollit culpa enim commodo commodo. Eiusmod sit do id consequat
        mollit in eu ullamco est proident reprehenderit. Pariatur pariatur sint
        nulla dolore incididunt.
      </Typography>
    </div>
  );
};

import Application from "./Application";
import Scene from "./Scene";
import ObjectFactory from "./ObjectFactory";
import EventRegister from "./EventRegister";

( new Application( new Scene( new ObjectFactory ), new EventRegister() ) ).main();
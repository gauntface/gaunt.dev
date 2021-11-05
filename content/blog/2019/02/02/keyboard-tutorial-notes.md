---
title: "KBWiki Tutorial Notes"
excerpt: "These are running notes as I go through the KBWiki tutorial
on how to make a custom keyboard."
mainImage: "/images/blog/2019/2019-02-02/bw-circuit.jpg"
primaryColor: ""
date: "2019-02-02T10:00:00-07:00"
updatedOn: "2019-02-02T10:00:00-07:00"
slug: "kbwiki-tutorial-notes"
---

These are my notes from running through the 
[kbwiki tutorial / guide](https://kbwiki.ai03.me/books/pcb-design) for
making a custom keyboard.

First few sections is largely getting familiar with GitHub and KiCad.

## PCB Guide 3

Wondering the the position of the +5V over the UVCC pin and chaining
with two join points has any benefit over placing the +5V over VCC.
I assume it makes no difference as this is just a schematic view.

The HWB pin seems to be used to run the bootloader after a reset under
certain conditions, otherwise it acts as a general purpose I/O. You
can find more on the 
[datasheet](http://ww1.microchip.com/downloads/en/devicedoc/atmel-7766-8-bit-avr-atmega16u4-32u4_datasheet.pdf) 
and searching for HWB.

### What is a Pull-Up/Down Resistor

I looked up a few posts on this, but this YouTube video helped
the most.

<iframe width="560" height="315" src="https://www.youtube.com/embed/BxA7qwmY9mg"></iframe>

Below are some notes I toke from the video, but it's the same content.

In digital circuits there are three states, not two.

On, off and floating.

Floating can be an issue for circuits where trapped current can cause
the circuit to oscillate.

#### Pull-Up Resistor

In a pull-up resistor configuration, the MCU pin is pulled up to 5V
by default. The reason the resistor is needed is because in the pull-up
resistor configuration, you don't want to connect the 5V directly to
ground as this will just drain the power source (a.k.a a short circuit).

Also worth noting that in a pull-up resister configuration, the current
will go to ground instead of the MCU because there is less / no impedence going to ground.

Pull-up resistors are normally built into the MCU.

#### Pull-Down Resistor

This configuration pulls the MCU pin down to GND. When 5V is connected, the resistor will provide enough impedence to GND that the current will go through the MCU pin.

You should select a resistor that is 10 X the impedence of the input pin.

Pull-Down normally needs to be built outside of the MCU.

### Why HWB / PE2 to Pull-Down?

Based on the logic table from the [datasheet](http://ww1.microchip.com/downloads/en/devicedoc/atmel-7766-8-bit-avr-atmega16u4-32u4_datasheet.pdf), it seems like you rarely want this pin to be high.

Also looking at the "27.5.3 External Hardware conditions" section,
it seems that when this pin is zero after a reset, it will force the
bootloader to execute.

### Why 10k Ohm?

I can't really see what this is value is coming from for the pull down
resistor value.

The datasheet makes a reference of 10k Ohm or less:

> The ADC is optimized for analog signals with an output 
> impedance of approximately 10k or less

But I don't think this applies here.

I considered that this value was perhaps taken from the teensy board
as a reference, but that's using a 1K ohm resistor.

### USB Resistors

The USB Resistors are given 22 Ohm resistors and this matches the
teensy board resistors.

Looking at the datasheet for this, it's clearly stated:

> Should be connected to the USB D+ connector pin
> with a serial 22 ohm resistor.

### UCAP Capacitor

Similar to the USB resistors, the values come from the datasheet.

> Should be connected to an external capacitor (1µF)

### Decoupling Capacitors

Taken from [AVR Freaks Blog Post](https://www.avrfreaks.net/forum/which-decoupling-caps-atmega32u4):

> There are three rues of thumb:
>
> 1.  100nF (0.1uF) ceramic for decoupling integrated circuits.   
>     Especially digital switching. Short leads have lowest 
>     self-inductance
>
> 2.  10uF - 470uF electrolytic or Tantalum for "current reservoir" 
>     in power supplies. Leads are less critical. 
>     High currents may need special quality.
>
> 3.  22pF for crystal oscillator circuits.

While this is far from official, it seems like like the 0.1uF is a
common practice and the 10uF is part of the above guidelines, but more
importantly is referenced in the datasheet:

> A 10µF capacitor is highly recommended on VBUS line

This YouTube video was extremely helpful for learning *how* a decoupling
circuit works / what it does.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mk61DNz27FI"></iframe>

The capacatiors provide charge to the MCU pins, preventing the need
to get the charge from the 5V line.

Secondly, should the pin discharge current, the low impedence of the
capacitor means the charge will go through the capactiors to GND, rather
than go to other pins.

### Crystal (Oscillator)

The tutorial references a "crystal" that controls how fast the
controller functions.

I believe it's referencing a [Crystal Oscillator](https://en.wikipedia.org/wiki/Crystal_oscillator) which is a circuit
that creates an electrical signal with a precise frequency.

The 22pF capacitors seem to be a standard used in Arduino. The
[datasheet for this kind of oscillator](http://www.ecsxtal.com/store/pdf/hc_49us.pdf)
hints at 20pF for load capacitance.

### Things to Explore....

1. Why are the capacitors needed in with the crystal ocillator?
    There is a notion of phase related with the voltage applied to
    the crystal and the capacitors help ensure a specific phase.

    It's discussed in this [Stackoverflow question](https://electronics.stackexchange.com/questions/250608/crystal-oscillator-load-capacitance-again)
    but it's still a little over my head how this works.